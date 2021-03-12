import FreeText from '../../../modules/FreeText';

function ModuleSlot({ module, space }) {
  if (!module) { return null; }

  switch (module.type) {
    case 'freetext':
      return <div className="box"><FreeText module={module} space={space} /></div>;
  
    default:
      return null;
  }
}

export default ModuleSlot;
