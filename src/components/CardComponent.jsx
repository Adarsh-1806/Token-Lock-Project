import "./CardComponent.css";
function CardComponent(props) {
  return (
    <>
      <div className="container-fluid">
        <div className="mainContainer  row justify-content-center bg-primary">
          <div className="subContainer border border-dark card w-sm-6 shadow border">
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
}
export default CardComponent;
