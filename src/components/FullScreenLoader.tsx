import { Spinner } from "@material-tailwind/react";
import { useLoading } from "contexts/LoadingContext";

function FullScreenLoader() {
    const { loading } = useLoading();

	return loading ? (
        <div className="absolute z-50 flex h-screen w-full touch-none select-none items-center justify-center bg-white/30 backdrop-blur-sm">
            <Spinner className="h-16 w-16 text-blue-500/10" />
        </div>
    ) : null;
}

export default FullScreenLoader;