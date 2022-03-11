import "./Content.css";
function Content(props) {
  return (
    <>
      <section className=" content-section">
        <div className="content-Wrapper">
          <div className="content-header">
            <h2> My Locks</h2>
          </div>
          <div className="content-body tableData">{props.children}</div>
        </div>
      </section>
    </>
  );
}
export default Content;
