import "./CardComponent.css";
function CardComponent(props) {
  return (
    <>
      <div className="mainContainer container-fluid row justify-content-center bg-primary p-5 ">
        <div className="subContainer border border-dark  card shadow border d-flex justify-content-center">
          {props.children}
        </div>
      </div>
    </>
  );
}
export default CardComponent;
