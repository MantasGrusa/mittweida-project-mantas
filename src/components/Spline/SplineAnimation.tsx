import Spline from '@splinetool/react-spline';

const SplineBackground = () => {
    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden z-[-1]">
            <Spline
                scene="https://prod.spline.design/or2WyzUtnFRue8VH/scene.splinecode"
                className="absolute top-1/2 left-1/2 w-full h-full cursor-default  -translate-x-1/2 -translate-y-1/2"
                style={{ cursor: "pointer" }}
            />

        </div>
    );
};

export default SplineBackground;
