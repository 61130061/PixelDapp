function WrongNet () {
   return (
      <div className="modal">
         <div className="body">
            <div className="warning-img" />
            <div className="message">
               This website supports Test Network only right now. Please change you metamask to <b>Rinkeby Test Network</b> to access the website.
            </div>
            <div className="footer">
               <div onClick={() => window.location.reload()} className="accept-but">Refresh Page</div>
            </div>
         </div>
      </div>
   )
}

export default WrongNet;
