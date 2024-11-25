import React from 'react';

const JsxExamples = () => {

    const userName = "Carlos";

    const user = {
        name: "Ana",
        lastName: "Souza"
    };

    function getName(name) {
        return `Olá ${name}`;
    }

    function sumTwoNumbers(num1, num2) {
        return num1 + num2;
    }

    return (
        <div className="alguma-coisa"><h2>O nome do usuário é {userName}, nome
            é {user.name} {user.lastName} {getName("Chuchu")}</h2>
            <button onClick={() => alert("1 + 3 =")}>Clique em mim</button>
        </div>
    )
}

export default JsxExamples;