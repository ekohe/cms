export default function evaluatePlaceholders(properties, element) {
  let componentProps = _.clone(properties)
  // Go through the properties and replace any placeholders with values from 'element'
  Object.keys(componentProps).forEach((key) => {
      if (typeof(componentProps[key])=='string') {

        // If whole string is a placeholder
        if (componentProps[key].match(/^\{[^}]*\}$/)!=null) {
          let attribute = componentProps[key].replace(/[\{\}]/g, '')
          try {
            componentProps[key] = eval("element."+attribute)
          } catch (e) {
            if (typeof(console)!='undefined') {
              console.log("Error while trying to evaluate placeholder: "+attribute+". Error message: "+e.message)
              console.log("Element:")
              console.log(element)
            }
          }
        } else {
          // Replace placeholders within string
          componentProps[key] = componentProps[key].replace(/\{([^\}]+)\}/g, (placeholder) => {
            let attribute = placeholder.replace(/[\{\}]/g, '')
            try {
              return eval("element."+attribute)
            } catch (e) {
              if (typeof(console)!='undefined') {
                console.log("Error while trying to evaluate placeholder: "+placeholder+". Error message: "+e.message)
                console.log("Element:")
                console.log(element)
              }
              return placeholder
            }
          })
        }
      }

      if (componentProps[key]) {
        Object.keys(componentProps[key]).forEach((k) => {
          if (typeof(componentProps[key][k])=='string') {
            componentProps[key][k] = componentProps[key][k].replace(/\{([^\}]+)\}/g, (placeholder) => {
              let attribute = placeholder.replace(/[\{\}]/g, '')
              try {
                return eval("element."+attribute)
              } catch (e) {
                if (typeof(console)!='undefined') {
                  console.log("Error while trying to evaluate placeholder: "+placeholder+". Error message: "+e.message)
                  console.log("Element:")
                  console.log(element)
                }
                return placeholder
              }
            })
          }
        })
      }
    }
  )

  return componentProps;
}
