import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styles from "./styles/Backdrop.module.scss";

const Backdrop = () => {
	return (
		<div className={styles.backdrop}>
			<AiOutlineLoading3Quarters
				className={styles.loader}
				color='#fff'
				size='3rem'
			/>
		</div>
	);
};

export default Backdrop;
