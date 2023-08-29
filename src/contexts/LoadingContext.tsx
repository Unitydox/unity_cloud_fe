import React, { createContext, useState, useContext } from "react";

interface LoadingContextType {
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoadingProviderProps {
	children: React.ReactNode;
}

const LoadingContext = createContext<LoadingContextType>({
	loading: false,
	setLoading: () => {},
});

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
	const [loading, setLoading] = useState(false);

	return (
		<LoadingContext.Provider value={{ loading, setLoading }}>
			{children}
		</LoadingContext.Provider>
	);
};

export const useLoading = () => {
	return useContext(LoadingContext);
};
