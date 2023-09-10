import React from "react";

export default function Filters() {
    return (
        <div>
            <div>
            |   <p>Type: </p>
                <select name="" id="">
                    <option value="">Default</option>
                    <option value="">Admin</option>
                    <option value="">User</option>
                </select>
            </div>
            <div>
            |   <p>Ban: </p>
                <select name="" id="">
                    <option value="">Default</option>
                    <option value="">Banned</option>
                    <option value="">Not</option>
                </select>
            </div>
            <div>
            |   <p>Verify: </p>
                <select name="" id="">
                    <option value="">Default</option>
                    <option value="">Yes</option>
                    <option value="">Not</option>
                </select>
            </div>
        </div>
    )
}