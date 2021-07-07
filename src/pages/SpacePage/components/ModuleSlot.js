import FreeText from '../../../modules/FreeText';
import Pomodoro from '../../../modules/Pomodoro';

function ModuleSlot({ module, spaceId }) {
  if (!module) { return null; }

  switch (module.type) {
    case 'freetext':
      return <div className="box"><FreeText module={module} spaceId={spaceId} /></div>;
    case 'pomodoro':
      return <div className="box"><Pomodoro module={module} spaceId={spaceId} /></div>;
  
    default:
      return null;
  }
}

export default ModuleSlot;
