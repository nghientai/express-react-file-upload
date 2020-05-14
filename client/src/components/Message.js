import React from "react";
import PropsTypes from "prop-types";

const Message = ({ message }) => {
   return (
      <div className="alert alert-success alert-dismissible fade show" role="alert">
         {message}
         <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
         </button>
      </div>
   );
};

Message.propTypes = {
   message: PropsTypes.string.isRequired
};

export default Message;
