import { TailSpin } from "react-loader-spinner";
import styles from "./LoadingPage.module.scss";

const LoadingPage = () => {
  return (
    <>
      <div className={styles["loading-container"]}>
        <TailSpin width={34} height={34} color="rgba(167, 41, 245, 1)" />
      </div>
    </>
  );
};

export default LoadingPage;
