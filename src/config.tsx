const config = {
	companyName: "Unitydox",
    supportNum: {
        IN: {
            default: ''
        }
    },
    api_url: (process.env.NODE_ENV == 'development') ? 'http://localhost:8000' : 'https://api.unitydox.com',
    env: process.env.NODE_ENV,
};

export default config;
