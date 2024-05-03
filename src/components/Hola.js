export default function Hola(props){


    const { currentUser } = props;
    const { imgestilo } = props;

    return (

        <div>
            <p>{currentUser ? currentUser.display_name : ''}</p>
            <img src={currentUser &&  ((currentUser.images) ? currentUser.images[1].url : '')} alt="" style={imgestilo}></img>

        </div>
    )

}