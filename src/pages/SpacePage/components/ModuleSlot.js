import FreeText from '../../../modules/FreeText';

function ModuleSlot({ module, setModule }) {
  if (!module) { return null; }

  switch (module.type) {
    case 'freetext':
      return <div className="box"><FreeText module={module} setModule={setModule} /></div>;
  
    default:
      return null;
  }
}

export default ModuleSlot;
