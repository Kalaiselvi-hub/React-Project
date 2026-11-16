function Form() {
    return(
       <form>
  <div className="mb-3">
    <label htmlfor="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
    <div id="emailHelp" class="form-text">We’ll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlfor="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1"></input>
  </div>
  <div className="mb-3 form-field">
    <input type="checkbox" id="exampleCheck1" class="check"></input>
    <label htmlfor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn-solid theme-primary">Submit</button>
</form>
    )
}

export default Form