import "./CardComponent.css";
function CardComponent(props) {
  return (
    <>
      <div className="container-fluid">
        <div className="mainContainer  row justify-content-center bg-primary">
          <div className="subContainer col-sm-6 col-lg-6 col-md-5 col-xs-8 border border-dark card shadow border p-1">
            <div className="card-title d-flex justify-content-center">
              <i className="fa fa-lock lockIcon" aria-hidden="true" />
              <h5>Add lock</h5>
            </div>
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
}
export default CardComponent;
