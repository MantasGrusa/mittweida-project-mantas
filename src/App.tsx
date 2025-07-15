// App.tsx
import { Route, Switch, useLocation } from "wouter";
import SplineLinkWrapper from "./components/Spline/SplineLinkWrapper";
import { useState } from "react";
import SplineBackground from "./components/Spline/SplineAnimation";
import StarterPage from "./Pages/Starter/StarterPage.tsx";
import AboutPage from "./Pages/About/AboutPage.tsx";
import SelectionCat from "./Pages/Selection/SelectionCat.tsx";
import LocationDetail from "./Pages/Location/LocationDetail.tsx";
import MapView from "./Pages/Location/MapView.tsx";
import QRPage from "./Pages/QR/qrPage";
import friendsPage from "./Pages/Friends/FriendsPage.tsx";
import SignUpPageDet from "./Pages/SignUpDet/SignUp.tsx";
import LoginPageDet from "./Pages/LogInDet/LogIn.tsx";
import LoginSignUpPage from "./Pages/Details/LogInSignUp.tsx";
import ProfilePage from "./Pages/Profile/Profile.tsx";
import JourneyCompletePage from "./Pages/Level/JourneyComplete.tsx";


function App() {
    const [showSplineLink, setShowSplineLink] = useState(true);
    const [location] = useLocation();

    console.log("🔍 App render - Location:", location, "ShowSplineLink:", showSplineLink);

    const handleRemove = () => {
        console.log("🚀 Handle remove called");
        setShowSplineLink(false);
    };

    return (
        <>
            <Switch>
                <Route path="/starter" component={StarterPage} />
                <Route path="/signupdet"  component={SignUpPageDet}/>
                <Route path="/logindet"  component={LoginPageDet}/>
                <Route path="/about" component={AboutPage} />
                <Route path="/friends" component={friendsPage} />
                <Route path="/selection-cat" component={SelectionCat} />
                <Route path="/details" component={LoginSignUpPage}/>
                <Route path="/profile" component={ProfilePage}/>
                <Route path="/level" component={JourneyCompletePage}/>
                <Route path="/location/sports">
                    {() => <LocationDetail category="sports" />}
                </Route>
                <Route path="/location/nightlife">
                    {() => <LocationDetail category="nightlife" />}
                </Route>
                <Route path="/location/culture">
                    {() => <LocationDetail category="culture" />}
                </Route>

                <Route path="/map/sports" component={MapView} />
                <Route path="/map/Nightlife" component={MapView} />
                <Route path="/map/culture" component={MapView} />

                <Route path="/qr" component={QRPage} />   {/* ✅ New QR Route */}

                <Route path="/">
                    {() => {
                        console.log("🏠 Root route matched");
                        return (
                            <>
                                {showSplineLink ? (
                                    <SplineLinkWrapper
                                        href="/details"
                                        scene="https://prod.spline.design/i6L9gJV8TMtupZc8/scene.splinecode"
                                        onClick={handleRemove}
                                    />
                                ) : (
                                    <div style={{color: 'white', padding: '20px', background: 'rgba(0,0,0,0.8)', zIndex: 9999}}>
                                        SplineLink is hidden. Current location: {location}
                                    </div>
                                )}
                            </>
                        );
                    }}
                </Route>
            </Switch>

            <SplineBackground />
        </>
    );
}

export default App;