import React from "react";
import { useParams } from "react-router-dom";
import FormUserModification from "../Form/FormUserModification/FormUserModification";

export default function Modification () {
  const { id } = useParams();
  return (
    <div>
      <FormUserModification id={id} />
    </div>
  )
}

