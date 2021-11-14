exports.validateData = (data) => {
    
    if (!data.hasOwnProperty("success")){
        return "Property 'success' is needed"
    }
    
    if (!data.hasOwnProperty("low_point")){
        return "Property 'low_point' is needed"
    }
    
    if (!data.hasOwnProperty("take_away")){
        return "Property 'take_away' is needed"
    }

    return true
}