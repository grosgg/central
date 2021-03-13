import FreeText from '../../../modules/FreeText';

function ModuleSlot({ module, spaceId }) {
  if (!module) { return null; }

  switch (module.type) {
    case 'freetext':
      return <div className="box"><FreeText module={module} spaceId={spaceId} /></div>;
  
    default:
      return null;
  }
}

export default ModuleSlot;
