export default function Shapeplaceholder(props) {
  return (
    <div className="shape-placeholder">
      <div className={props.name}></div>
      <div className={props.name} id="shapeTwo"></div>
    </div>
  );
}
