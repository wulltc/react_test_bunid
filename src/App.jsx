import Header from "./components/header";
import appStyles from "./app.module.scss"
import Content from "./views/content";

function App() {
    return <main className={appStyles.container}>
        <Header/>
        <Content/>
    </main>
}

export default App
