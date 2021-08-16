import React from 'react';

import { Button, Flyout} from "./core-modules";
import TriggerGroup from "./TriggerGroup";


const App = () => {

  
    return (
      <div>
        <span>This is a test of the trigger group</span>
        <br/>
        <ul>
          <li>
              <TriggerGroup groupName="furniture">
                <TriggerGroup.Trigger>
                  <Button text="furniture" aria-controls="furniture-flyout" key="2" />
                </TriggerGroup.Trigger>
                <TriggerGroup.Target>
                  <Flyout cssClass="flyout">furniture contents</Flyout>
                </TriggerGroup.Target>
              </TriggerGroup>
            </li>
            <li>
              <TriggerGroup groupName="outdoor">
                <TriggerGroup.Trigger>
                  <Button text="outdoor" aria-controls="outdoor-flyout" key="4" />
                </TriggerGroup.Trigger>
                <TriggerGroup.Target>
                  <Flyout cssClass="flyout">outdoor contents</Flyout>
                </TriggerGroup.Target>
              </TriggerGroup>
            </li>
          </ul>

      </div>
    );
}

export default App;



