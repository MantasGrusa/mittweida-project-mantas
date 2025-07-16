import { useState, useEffect } from "react";
import BarcodeScanner from "react-qr-barcode-scanner";
import { useLocation } from "wouter";

interface User {
    id: string;
    username: string;
    email: string;
}

function QRScanner() {
    const [, setLocation] = useLocation();
    const [data, setData] = useState("No QR code detected");
    const [user, setUser] = useState<User | null>(null);
    const [scanning, setScanning] = useState(true);
    const [loading, setLoading] = useState(false);
    const [expectedQRCode, setExpectedQRCode] = useState<string | null>(null);
    const [currentLocationName, setCurrentLocationName] = useState<string>("");

    useEffect(() => {
        // Get user data from localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }

        // Get expected QR code and location info
        const storedQRCode = localStorage.getItem('expectedQRCode');
        const currentLocation = localStorage.getItem('currentLocation');

        if (storedQRCode) {
            setExpectedQRCode(storedQRCode);
        }

        if (currentLocation) {
            try {
                const location = JSON.parse(currentLocation);
                setCurrentLocationName(location.name);
            } catch (error) {
                console.error('Error parsing current location:', error);
            }
        }
    }, []);

    const handleUpdate = async (err: any, result: any) => {
        console.log("QR Update called:", { err, result, scanning, user });

        if (err) {
            console.log("QR Error:", err);
            setData("Error reading QR code - try again");
            return;
        }

        if (!result || !scanning || !user) {
            return;
        }

        console.log("Processing QR code:", result.text);
        console.log("Expected QR code:", expectedQRCode);

        // VALIDATE QR CODE MATCHES EXPECTED LOCATION
        if (expectedQRCode && result.text !== expectedQRCode) {
            console.log("QR code doesn't match expected code!");
            setData(`❌ Wrong QR code! Expected: ${expectedQRCode}`);
            setTimeout(() => {
                setScanning(true);
                setData("Scan the correct QR code for this location");
            }, 3000);
            return;
        }

        if (!expectedQRCode) {
            console.log("No expected QR code found!");
            setData("❌ Location data missing. Please go back and try again.");
            return;
        }

        setScanning(false);
        setLoading(true);
        setData(`Processing: ${result.text}`);

        try {
            console.log("Making API call to:", `http://localhost:3000/users/scan-qr/${user.id}`);

            const response = await fetch(`http://localhost:3000/users/scan-qr/${user.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    qrCode: result.text
                })
            });

            console.log("API Response status:", response.status);
            console.log("API Response ok:", response.ok);

            const scanResult = await response.json();
            console.log("API Response data:", scanResult);
            console.log("scanResult.success:", scanResult.success);

            if (response.ok && scanResult.success) {
                console.log("ENTERING SUCCESS BLOCK!");
                localStorage.setItem('levelResult', JSON.stringify({
                    success: true,
                    message: scanResult.message,
                    progress: scanResult.progress,
                    locationName: currentLocationName,
                    scannedCode: result.text
                }));

                setData(`✅ ${scanResult.message}`);
                console.log("Success! Navigating immediately...");

                // Force navigation immediately using the same method that works manually
                window.location.href = "/#/level";
            } else {
                console.log("ENTERING ERROR BLOCK!");
                console.log("Response ok:", response.ok);
                console.log("scanResult.success:", scanResult.success);
                setData(`❌ ${scanResult.message || 'Invalid QR code'}`);
                setTimeout(() => {
                    setScanning(true);
                    setData("Try scanning again");
                }, 2000);
            }
        } catch (error) {
            console.error('Detailed API error:', error);
            setData("❌ Network error. Please try again.");
            setTimeout(() => {
                setScanning(true);
                setData("Try scanning again");
            }, 2000);
        } finally {
            setLoading(false);
        }
    };

    const handleBackClick = () => {
        // Go back to the map page with the current category
        const currentLocation = localStorage.getItem('currentLocation');
        if (currentLocation) {
            try {
                const location = JSON.parse(currentLocation);
                setLocation(`/map/${location.category}`);
            } catch (error) {
                setLocation('/map'); // fallback
            }
        } else {
            setLocation('/map'); // fallback if no current location
        }
    };

    const handleRetryScanning = () => {
        setScanning(true);
        setData("Ready to scan QR code");
    };

    if (!user) {
        return (
            <div className="qr-scanner-page">
                <div className="scanner-container">
                    <h2 className="scanner-title">Please Log In</h2>
                    <p>You need to be logged in to scan QR codes</p>
                    <button onClick={() => setLocation('/login')}>
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="qr-scanner-page">
            <div className="scanner-container">
                <button
                    onClick={handleBackClick}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        background: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        cursor: 'pointer',
                        zIndex: 1000
                    }}
                >
                    ←
                </button>

                <h2 className="scanner-title">Scan QR Code</h2>

                {currentLocationName && (
                    <p style={{ marginBottom: '20px', color: '#666' }}>
                        Location: {currentLocationName}
                    </p>
                )}

                {expectedQRCode && (
                    <p style={{ marginBottom: '20px', fontSize: '12px', color: '#888' }}>
                        Expected code: {expectedQRCode}
                    </p>
                )}

                {scanning && !loading ? (
                    <BarcodeScanner
                        width={400}
                        height={400}
                        onUpdate={handleUpdate}
                    />
                ) : (
                    <div
                        style={{
                            width: '400px',
                            height: '400px',
                            background: '#f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '8px',
                            border: '2px dashed #ccc'
                        }}
                    >
                        {loading ? (
                            <div style={{ textAlign: 'center' }}>
                                <div>🔄 Processing...</div>
                                <div style={{ fontSize: '12px', marginTop: '10px' }}>
                                    Validating QR code
                                </div>
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center' }}>
                                <div>📷 Camera paused</div>
                                <button
                                    onClick={handleRetryScanning}
                                    style={{
                                        marginTop: '10px',
                                        padding: '8px 16px',
                                        background: '#007bff',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Scan Again
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <p className="scanner-result" style={{
                    marginTop: '20px',
                    padding: '10px',
                    borderRadius: '8px',
                    background: data.includes('✅') ? '#d4edda' :
                        data.includes('❌') ? '#f8d7da' : '#f8f9fa',
                    color: data.includes('✅') ? '#155724' :
                        data.includes('❌') ? '#721c24' : '#495057'
                }}>
                    {data}
                </p>

                <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
                    <p>📍 Make sure you're at the correct location</p>
                    <p>📱 Point your camera at the QR code for THIS location</p>
                    <p>🎯 Only the correct QR code will work!</p>
                </div>
            </div>
        </div>
    );
}

export default QRScanner;