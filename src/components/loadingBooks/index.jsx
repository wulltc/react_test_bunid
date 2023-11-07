import loadingStyles from "./loading.module.scss";

const {loading, wrapper} = loadingStyles;
const LoadingBooks = () => {
    return <div className={loading}>
        <div className={wrapper}>
            <div/>
            <div/>
            <div/>
            <div/>
        </div>
    </div>
}

export default LoadingBooks