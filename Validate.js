$("#formValidation").validate({
    /*reglerne for de enkelte felter */
    rules: {
        name: {
            minlength: 2,
            /*Laver myName for at kunne tilføje en regel ekstra. myName selv lavet variable.*/
            myName: true
        },
        email:{
            email: true
        },
        tlf: {
            minlength: 8,
            digits: true
          },
        address: {
            minlength: 2
        }
    },
    /*Det er hvad fejl beskeden skal være på de forskellige felter */
    messages: {
        name: {
            required: "Please enter your name.",
            minlength: "Name at least 2 characters."
        },
        email: "Please enter a valid E-mail. 'test@hej.com'",
        tlf:{
            required: "Please enter your number.",
            minlength: "Must be 8 digits."
        },
        address: "Please enter your address. Must be 2 characters"
    },
    submitHandler: function(form) {
        form.submit();
    } 
});

/*Laver et check på email, at den indeholder det som den skal. Bruger regex til at samligne */
$.validator.methods.email = function( value, element ) {
    /*optional tjekker om feltet er tom eller ej, før den begynder at kontrollere på reglerne
    test tester for et match i en string */
    return this.optional( element ) || /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/.test( value );
}

/*Laver et tjek på brugernavnet, at der kun er bogstaver og whitespace. */
jQuery.validator.addMethod("myName", function(value, element) {

    /* prototype gør at jeg søger efter variablens propperty. Kan derfor manipulere med den.*/
    String.prototype.killWhiteSpace = function() {
        /*fjerner ekstra      mellemrum */
        return this.replace(/\s+/g, ' ');
    };

    /*Trimmer name for unødvendig mellemrum*/
    value = value.trim();
    value = value.killWhiteSpace();

    /*Hvis navnet ikke er tomt */
    if(!value.startsWith(" ") && !value.endsWith(" ")){
        /*optional tjekker om feltet er tom eller ej, før den begynder at kontrollere på reglerne
        test tester for et match i en string */
        return this.optional( element ) || /^[a-zA-z ]*$/.test( value );
    }
}, 'Only characters allowed. Spaces are between names.');