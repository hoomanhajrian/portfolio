import ReactLoading from 'react-loading';

const AppLoading = () => (
    <div style={{maxWidth:'40%',height:'50vh',marginRight:'auto',marginLeft:'auto'}}>
    <ReactLoading type={"spinningBubbles"} color={'lightblue'} height={'100%'} width={'100%'}/>
    </div>
);

export default AppLoading;