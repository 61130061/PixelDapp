function Confirm () {
   return (
      <div className="modal">
         <div className="body">
            <div className="message">
               Are you sure you want to paint #ffffff on (10, 10)?
            </div>
            <div>Do not show this message again</div>
            <div className="footer">
               <div className="accept-but">Confirm</div>
               <div className="cancle-but">Cancle</div>
            </div>
         </div>
      </div>
   )
}

export default Confirm;
