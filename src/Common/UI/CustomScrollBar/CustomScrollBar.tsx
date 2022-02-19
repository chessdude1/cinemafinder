import { Scrollbars } from 'react-custom-scrollbars';

interface ICustomScrollbars {
  children?: React.ReactNode;
}
export function CustomScrollbars(children: React.ReactNode) {
  return <Scrollbars style={{ width: 500, height: 200 }} autoHide autoHideTimeout={1000} autoHideDuration={200} autoHeight autoHeightMin={0} autoHeightMax={200} thumbMinSize={30} universal={true} />;
}
