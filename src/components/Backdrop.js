import styles from './header/Header.module.css'


function Backdrop(props){
    return <div className={styles.backdrop} onClick={props.onClick}/>
}
export default Backdrop;