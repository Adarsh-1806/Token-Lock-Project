function CardComponent(props) {
  return (
    <>
      <div className="container-fluid row justify-content-center ">
        <div className="border border-dark w-50 p-2 card shadow border  ">
          {props.children}
        </div>
      </div>
    </>
  );
}
export default CardComponent;
