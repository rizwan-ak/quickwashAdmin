import React, { Component } from "react";
import Header from "../components/Header";
import dp from "../assets/dp.png";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

import AC from "../redux/actions/actionCreater";
import FB from "../firebase";

class Chat extends Component {
  state = {
    selectedChat: "",
    chat: "",
    user: "",
    msg: "",
  };

  componentDidMount() {
    this.orders();
  }

  componentDidUpdate = () => {
    const container = document.getElementById("recent");
    if (container) {
      container.scrollTo(0, container.scrollHeight);
    }
  };

  orders = async () => {
    await FB.getChats((chats) => this.props.getChats(chats));
  };

  selectChat = async (id, chat, user) => {
    this.setState({ selectedChat: id, chat: chat });
    await FB.getUser(user, (val) => this.setState({ user: val }));
  };

  sendMsg = async () => {
    if (this.state.msg && this.state.msg.replace(/\s/g, "").length) {
      await FB.sendMsg(this.state.chat.orderId, this.state.msg);
    }
    this.setState({
      msg: "",
      chat: this.props.chats.filter(
        (c) => c.orderId === this.state.selectedChat
      )[0],
    });
  };

  render() {
    return (
      <Header>
        <Container>
          <div className="px-4">
            {/* <!-- For demo purpose--> */}

            <div className="row overflow-hidden shadow myBorder">
              {/* <!-- Users box--> */}
              <div className="col-5 px-0">
                <div className="bg-white">
                  <div className="bg-gray px-4 py-2 bg-light">
                    <p className="h5 mb-0 py-1">Recent</p>
                  </div>
                  <div className="messages-box">
                    {this.props.chats.map((c) => (
                      <div key={c.orderId} className="list-group rounded-0">
                        <div
                          key={c.orderId}
                          onClick={() => this.selectChat(c.orderId, c, c.with)}
                          style={{ cursor: "pointer" }}
                          className={
                            c.orderId === this.state.selectedChat
                              ? "list-group-item secondaryBg text-white"
                              : "list-group-item list-group-item-action list-group-item-light"
                          }
                        >
                          <div className="media">
                            <div className="media-body ml-4">
                              <div className="d-flex align-items-center justify-content-between mb-1">
                                <h6 className="mb-0">Order ID: {c.orderId}</h6>
                              </div>
                              <p className="font-italic mb-0 text-small">
                                {c.messages[
                                  c.messages.length - 1
                                ].msg?.substring(0, 100)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* <!-- Chat Box--> */}
              <div className="col-7 px-0">
                {this.state.chat ? (
                  <div>
                    <div id="recent" className=" chat-box bg-white">
                      <div className="sticky-top bg-white">
                        <h5 className="p-2 text-capitalize">
                          <img
                            src={this.state.user.image || dp}
                            alt="user"
                            width="50"
                            height="50"
                            className="rounded-circle mx-5"
                          />
                          {this.state.user.firstName} {this.state.user.lastName}
                        </h5>
                        <hr />
                      </div>

                      <div className="px-4">
                        {this.state.chat?.messages?.map((c) => (
                          <div
                            key={c.time}
                            className={
                              c.sender === "admin"
                                ? "media w-75 mb-3"
                                : "media w-75 ml-auto mb-3"
                            }
                          >
                            <div className="media-body ml-3">
                              <div
                                className={
                                  c.sender === "admin"
                                    ? "bg-light rounded py-2 px-3 mb-2"
                                    : "rounded py-2 px-3 mb-2 primaryBg"
                                }
                              >
                                <p
                                  className={
                                    c.sender === "admin"
                                      ? "text-small mb-0 text-muted"
                                      : "text-small mb-0 text-white"
                                  }
                                >
                                  {c.msg}
                                </p>
                              </div>
                              <p className="small text-muted">
                                {c.date} | {c.time}
                              </p>
                            </div>
                          </div>
                        ))}

                        {/* <div className="media w-75 ml-auto mb-3">
                          <div className="media-body">
                            <div className="rounded py-2 px-3 mb-2 primaryBg">
                              <p className="text-small mb-0 text-white">
                                loramConsectetur sint incididunt aliquip sunt
                                sunt incididunt id minim dolor labore. Cupidatat
                                et nulla ea sit in
                              </p>
                            </div>
                            <p className="small text-muted text-right">
                              30 july 2020 | 11:30pm
                            </p>
                          </div>
                          <img
                          src={dp}
                          alt="user"
                          width="50"
                          height="50"
                          className="rounded-circle ml-3"
                        />
                        </div> */}
                      </div>
                    </div>

                    {/* <!-- Typing area --> */}
                    <div className="input-group">
                      <input
                        style={{ border: "none" }}
                        type="text"
                        name="message"
                        placeholder="Type your message..."
                        value={this.state.msg}
                        onChange={(e) => this.setState({ msg: e.target.value })}
                        // onClick={() => this.messageRead(this.state.chat)}
                        className="form-control rounded-0 border-0 py-4 bg-light"
                      />
                      <div className="input-group-append">
                        <button onClick={this.sendMsg} className="btn btn-link">
                          <ion-icon
                            style={{ color: "#a6c2ab" }}
                            name="send-sharp"
                          ></ion-icon>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <h1
                    style={{ paddingTop: "40vh" }}
                    className="text-center text-muted display-4"
                  >
                    Select a chat.
                  </h1>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Header>
    );
  }
}
export default connect((state) => state, { getChats: AC.getChats })(Chat);
