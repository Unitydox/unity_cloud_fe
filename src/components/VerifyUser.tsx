import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "hooks/useQuery";
import { userMailVerification } from "services/userService";

const VerifyUser: React.FC = () => {
	const navigate = useNavigate();

	const urlParams = useQuery();

	useEffect(() => {
		const userId = urlParams.get("id");

		if (userId) {
			userMailVerification(userId)
				.then((res) => {
					console.log(res);
					const user = localStorage.getItem("user");

					if (res.status && user) {
						navigate("/app/photos");
					} else {
						navigate("/user/login");
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	return <></>;
};

export default VerifyUser;
