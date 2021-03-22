import { Fragment, useState } from 'react';
import {
  useUser,
  useFirestore,
} from 'reactfire';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import ModuleModal from './ModuleModal';

function Pomodoro ({ module, spaceId }) {
  // console.log('Pomodoro', module);
  const { data: user } = useUser();
  const firestore = useFirestore();
  const [modal, setModal] = useState();
  const [key, setKey] = useState(0);
  const [playing, setPlaying] = useState(false);

  const colors = {
    focus: '#ff6961',
    rest: '#00d1b2',
  } ;

  function setModule(data) {
    firestore.collection('users').doc(user.uid)
      .collection('spaces').doc(spaceId)
      .collection('modules').doc(module.id).set(
      data, { merge: true }
    ).then(() => {
      setKey(key + 1);
    });
  }

  function onComplete() {
    console.log('onComplete');
    setModule({
      currently: module.currently === 'focus' ? (((module.count + 1) % module.set) ? 'shortBreak' : 'longBreak') : 'focus',
      count: module.currently === 'focus' ? module.count + 1 : module.count,
    });
  }

  const checkmarks = [];
  for (let i = 1; i <= module.set; i++) {
    checkmarks.push(
      <input type="checkbox" key={i} disabled checked={i <= module.count % module.set} />
    );
  }

  return (
    <Fragment>
      <div style={{width: '150px', margin: 'auto'}}>
        <CountdownCircleTimer
          key={key}
          size={150}
          isPlaying={playing}
          duration={module[module.currently] * 60}
          colors={module.currently === 'focus' ? colors.focus : colors.rest}
          onComplete={onComplete}
        >
          {({ remainingTime }) => {
            const minutes = (Math.floor(remainingTime / 60)).toString().padStart(2, '0');
            const seconds = (remainingTime % 60).toString().padStart(2, '0');
          
            return `${minutes}:${seconds}`
          }}
        </CountdownCircleTimer>
      </div>

      <div className="columns is-mobile">
        <div className="column">
          {checkmarks}
        </div>
        <div className="column has-text-right is-size-6">
          Total: {module.count}
        </div>
      </div>

      <div className="columns is-mobile">
        <div className="column">
          <button className="button is-primary is-small" onClick={() => setPlaying(!playing)}>
            { playing ? 'Stop' : 'Start' }
          </button>
        </div>
        <div className="column has-text-right">
          <button className="button is-small" onClick={() => setModal(module, spaceId)}>Set</button>
        </div>
      </div>

      { modal &&
        <ModuleModal
          module={module}
          spaceId={spaceId}
          onReset={() => setKey(key + 1)}
          onClose={() => setModal(null)}
        />
      }
    </Fragment>
  );
}

export default Pomodoro;
