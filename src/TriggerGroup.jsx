import React, {useRef, useMemo, useState, useCallback, useEffect, Children, isValidElement, cloneElement, createContext, useContext} from 'react';

const TriggerContext = createContext();
const hoverInDelay = 200;
const hoverOutDelay = 100;

//this is the wrapping context to make sure the trigger context is used properly.
const useTriggerContext = () => {
    const context = useContext(TriggerContext);
    if (!context) {
        throw new Error(
            `Trigger compound components cannot be rendered outside the Trigger component`
        );
    }
    return context;
};

///This method is used to make sure that the effect is applied after the component is mounted to avoid the first mount triggering the call
const useEffectAfterMount = (cb, dependencies) => {
    const justMounted = useRef(true);
    useEffect(() => {
        if (!justMounted.current) {
            return cb();
        }
        justMounted.current = false;
    }, [cb, dependencies]);
};

const TriggerGroup = (props) => {
    const [isVisible, setVisibility] = useState(false);

   // const changeVisibility = React.useCallback((newValue) => setVisibility(newValue),[]); //empty dependency list means function always stays the same
    const groupName = props.groupName;

    //used to keep track of each value to avoid reinstantiating each object underneath it and uses a copy in memory
    const value = useMemo(() => ({ groupName, isVisible, setVisibility }), [groupName, isVisible, setVisibility]);

    //executes each time the isVisible property changes to bubble up data to the parent container
    useEffectAfterMount(() => {
        if (typeof props.onTrigger === "function") {
            props.onTrigger(isVisible);
        }
    }, []);

    return (
        <TriggerContext.Provider value={value}>
            {props.children}
        </TriggerContext.Provider>
    );
};

const Trigger = ({ children }) => {
    const { setVisibility, groupName, isVisible } = useTriggerContext();
    const visibilityRef = useRef();
    visibilityRef.current = isVisible;
    const timeoutId = useRef();
    timeoutId.current = setTimeout(() => {},);
    
    const on = () => {
        console.log(`trigger on ${groupName}, timeoutId ${timeoutId.current}`);
        setVisibility(!visibilityRef.current);
        clearTimeout(timeoutId.current);
    };

    //if trigger gets hoverstate within certain period of time, don't undo state
    const off = () => {
         timeoutId.current = setTimeout(() => {
             console.log('calling trigger setVisibilty :', visibilityRef.current);
             setVisibility(!visibilityRef.current);
           }, hoverOutDelay);
    };

    let clonedElements = Children.map(children, (child) => {
        console.log(child)
        if (isValidElement(child))
            return cloneElement(child, { onMouseEnter: on, onMouseOut: off });

        return child;
    });

    let wrapper = <>{clonedElements}</>;
    return wrapper;
};

const Target = ({ children }) => {
    const { isVisible, setVisibility, groupName } = useTriggerContext();

    const visibilityRef = useRef();
    visibilityRef.current = isVisible;
    const timeoutId = useRef();
    timeoutId.current = setTimeout(() => {},);

    //if target gets hover state within certain period of time, don't undo state
    const on = () => {
        console.log(`trigger on ${groupName}, timeoutId ${timeoutId.current}`);
        setVisibility(!visibilityRef.current);
        clearTimeout(timeoutId.current);
    };

    const off = () => {
        console.log(`trigger off ${groupName}, timeoutId ${timeoutId.current}`);
        timeoutId.current = setTimeout(() => {
            console.log('calling trigger setVisibilty');
            setVisibility(!visibilityRef.current);
          }, hoverOutDelay);
    };

    let clonedElements = Children.map(children, (child) => {
        if (isValidElement(child)) {
            // in order for the click events to be passed properly, the child component being used must pass the props into the final element to work properly.
            // ex. <Child /> => <div {...props}></div>
            return cloneElement(child, { onMouseEnter: on, onMouseOut: off });
        }
        return child;
    });

    let wrapper = <>{clonedElements}</>;
    return isVisible ? wrapper : null;
};

TriggerGroup.Trigger = Trigger;
TriggerGroup.Target = Target;

export default TriggerGroup;
