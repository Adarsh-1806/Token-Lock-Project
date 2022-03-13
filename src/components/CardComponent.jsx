import "./CardComponent.css";
function CardComponent(props) {
  return (
    <>
      <div className="container-fluid bg-primary py-5">
        <div className="mainContainer  row justify-content-center mx-auto bg-light  col-sm-6 col-lg-4 col-md-5 col-xs-8 border border-dark card shadow border p-1">
          <div className="card-title d-flex mt-3 justify-content-center card-topheader">
            <i className="fa fa-lock lockIcon " aria-hidden="true" />
            <h4 className="mb-0">Add lock</h4>
          </div>
          {props.children}
        </div>
      </div>
    </>
  );
}
export default CardComponent;
