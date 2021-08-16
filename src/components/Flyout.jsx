import Item from './Item';

const Flyout = (props) => {

   const myObject = {
        1: 'Sofa',
        2: 'Bed',
        3: 'Sofa Beds',
    }; 

    const innerMenuItems = Object.entries(myObject)
    .map(([key, value]) => (
      <Item key={key} value={value}>{value}</Item>
    ));

  return (
    <div className="flyout">
        <ul className="inner-list">
          {innerMenuItems}
        </ul>
    </div>
  );
}


export default Flyout;