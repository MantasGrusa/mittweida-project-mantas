import { useState } from "react";
import BarcodeScanner from "react-qr-barcode-scanner";
import {useLocation} from "wouter";

function QRScanner() {
    const [, setLocation] = useLocation();
    const [data, setData] = useState("No QR code detected");

    const handleUpdate = (err:any, result:any) => {
        if (result) {
            setLocation("/level");
            setData(result.text);
            console.log(result.text);
        } else if (err) {
            setData("Error reading QR code");
        }
    };

    return (
        <div className="qr-scanner-page">
            <div className="scanner-container">
                <h2 className="scanner-title">Scan a QR Code</h2>
                <BarcodeScanner
                    width={400}
                    height={400}
                    onUpdate={handleUpdate}
                />

                <p className="scanner-result">{data}</p>
            </div>

        </div>
    );
}

export default QRScanner;
