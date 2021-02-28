
function SpaceModal({ space, onClose }) {
  if (!space) return '';

  return(
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <p className="title">{space.name}</p>
          <form>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input" type="text" placeholder="e.g. Main, Work, Home" />
              </div>
            </div>

            <button className="button is-primary">Save</button>
          </form>
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={() => onClose()}
      ></button>
    </div>
  );
}

export default SpaceModal;
