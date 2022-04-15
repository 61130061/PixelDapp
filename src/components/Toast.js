import { useEffect } from 'react';

function Toast ({ data, toastList, setToastList }) {

   useEffect(() => {
      const interval = setInterval(() => {
         deleteToast();
      }, data.duration*1000);

      return () => {
         clearInterval(interval);
      }
   }, []);

   const deleteToast = () => {
      const itemIndex = toastList.indexOf(data);
      if (itemIndex > -1) {
         setToastList(preList => {
            const arr = [...preList];
            arr.splice(itemIndex, 1);
            return arr;
         });
      }
   }

   return (
      <div onClick={deleteToast} style={{backgroundColor: data.color}} className="toast">
         <div className="message">{data.message}</div>
         <div onClick={deleteToast} className="close-but">x</div>
      </div>
   )
}

export default Toast;
