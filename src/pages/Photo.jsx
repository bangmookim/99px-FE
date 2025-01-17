import {
  TbArrowsDiagonal,
  TbArrowNarrowLeft,
  TbArrowsDiagonalMinimize2,
} from "react-icons/tb";
import { RxCaretRight, RxCaretLeft, RxShare1 } from "react-icons/rx";
import {
  IoMdHeartEmpty,
  IoMdHeart,
  IoIosInformationCircleOutline,
} from "react-icons/io";
import { BsPlusSquare, BsThreeDots, BsChevronRight } from "react-icons/bs";
import styled from "styled-components";
import { CiLocationOn } from "react-icons/ci";
import { SlFire } from "react-icons/sl";
import { AiOutlineBarChart } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import useInput from "../hooks/useInput";
import useFullscreen from "../hooks/useFullscreen";
import useToggle from "../hooks/useToggle";
import { getInfo } from "../api/getinfo";
import Header from "../components/ui/Header";
import useIsLogin from "../hooks/useIsLogin";

const Photo = () => {
  const { element, triggerFull, exitFull } = useFullscreen();
  const [postWindow, setPostWindow] = useState(false);
  const [replyWindow, setReplyWindow] = useState(false);
  const [height, setHeight] = useState(0);
  const [isLike, isLikeChangeHandler] = useToggle();
  const [followText, setFollowText] = useState("Following");
  const [isFollow, isFollowChangeHandler] = useToggle();
  const [comment, commentChangeHandler] = useInput();
  const [reComment, reCommentChangeHandler] = useInput();
  const [isFullScreen, isFullScreenChangeHandler] = useToggle();
  const navigate = useNavigate();
  const onTextAreaHeightHandler = (e) => {
    const scHeight = e.target.scrollHeight;
    setHeight(scHeight);
  };

  const isLogin = useIsLogin();
  const [info, setInfo] = useState();
  const params = useParams();

  getInfo(params.id).then((res) => {
    setInfo(res.data.data);
  });

  return (
    <Body>
      <Header />
      <ImgBox ref={element}>
        <ImgWrap>
          <div
            style={{
              zIndex: "1",
              position: "absolute",
              width: "25vw",
              height: "90%",

              left: "5%",
            }}
          >
            <IconWrap>
              <TbArrowNarrowLeft
                onClick={() => {
                  navigate(-1);
                }}
                size="40"
                color="white"
              ></TbArrowNarrowLeft>
            </IconWrap>
            <BoxButton>
              <RxCaretLeft size="40" color="white"></RxCaretLeft>
            </BoxButton>
          </div>

          <img
            style={{
              position: "static",

              width: "auto",
            }}
            src={info?.url}
          ></img>
          <div
            style={{
              zIndex: "1",
              position: "absolute",
              width: "25vw",
              height: "90%",

              right: "5%",
            }}
          >
            <IconWrap
              onClick={() => {
                isFullScreenChangeHandler();
                if (!isFullScreen) {
                  return triggerFull();
                }
                if (isFullScreen) {
                  return exitFull();
                }
              }}
              direction="right"
            >
              {!isFullScreen ? (
                <TbArrowsDiagonal size="36" color="white"></TbArrowsDiagonal>
              ) : (
                <TbArrowsDiagonalMinimize2
                  size="36"
                  color="white"
                ></TbArrowsDiagonalMinimize2>
              )}
            </IconWrap>
            <BoxButton direction="right">
              <RxCaretRight size="40" color="white"></RxCaretRight>
            </BoxButton>
          </div>
        </ImgWrap>
      </ImgBox>
      <Container>
        {/* 컨텐츠 영역 */}
        <ContentContainer>
          <IconContainer>
            <IconWrap onClick={isLikeChangeHandler}>
              {!isLike ? (
                <IoMdHeartEmpty size="28"></IoMdHeartEmpty>
              ) : (
                <IoMdHeart color="#B2293B" size="28"></IoMdHeart>
              )}
            </IconWrap>
            <IconWrap>
              <BsPlusSquare size="22"></BsPlusSquare>
            </IconWrap>
            <IconWrap>
              <RxShare1 size="24"></RxShare1>
            </IconWrap>
            <IconWrap>
              <BsThreeDots size="24"></BsThreeDots>
            </IconWrap>
          </IconContainer>
          <ProFileBox>
            <ProFileImg src="https://drscdn.500px.org/user_avatar/1544417/q%3D85_w%3D100_h%3D100/v2?webp=true&v=7&sig=f89f718fcec7996e21e632dcbdd9ecff1d7202ad8c978e12ba7f166bb73555d8"></ProFileImg>
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: "8px",
              }}
            >
              <BigString>{info?.title}</BigString>
              <div>
                <span style={{ cursor: "pointer" }}>
                  by {info?.memberResponseDto.email.split("@")[0]}
                  <span>•</span>
                </span>

                <FollowButton
                  textcolor={isFollow}
                  onMouseOver={() => {
                    setFollowText("Unfollow");
                  }}
                  onMouseOut={() => {
                    setFollowText("Following");
                  }}
                  onClick={isFollowChangeHandler}
                >
                  {isFollow ? followText : "Follow"}
                </FollowButton>
              </div>
            </div>
          </ProFileBox>
          <div
            style={{
              width: "100%",
              height: "29px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <CiLocationOn size="24"></CiLocationOn>
            <p>
              <span style={{ borderBottom: "1px dashed" }}>
                {info?.location}
              </span>
              <span style={{ fontWeight: "700", marginLeft: "24px" }}>
                Uploaded{" "}
              </span>
              7 days ago
            </p>
          </div>
          <TextWrap>{info?.description}</TextWrap>
          <div
            style={{
              minHeight: "60px",
              display: "flex",
              marginBottom: "16px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                // height: '100%',
                margin: "0 32px 8px 0",
                display: "flex",

                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginBottom: "8px",
                  whiteSpace: "nowrap",
                }}
              >
                Highest Pulse
                <IoIosInformationCircleOutline size="20"></IoIosInformationCircleOutline>
              </div>
              <BigString>97.4</BigString>
            </div>
            <div
              style={{
                // height: '100%',
                margin: "0 32px 8px 0",
                display: "flex",

                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginBottom: "8px",
                  whiteSpace: "nowrap",
                }}
              >
                Impressions
                <IoIosInformationCircleOutline size="20"></IoIosInformationCircleOutline>
              </div>
              <BigString>12.5K</BigString>
            </div>
            <div
              style={{
                // height: '100%',
                margin: "0 32px 8px 0",
                display: "flex",

                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginBottom: "8px",
                  whiteSpace: "nowrap",
                }}
              >
                Popular
                <IoIosInformationCircleOutline size="20"></IoIosInformationCircleOutline>
              </div>
              <div>
                <SlFire size="24"></SlFire>
              </div>
            </div>
          </div>
          <TextWrap>
            <TextClick>
              452 people liked this photo
              <BsChevronRight></BsChevronRight>
            </TextClick>
          </TextWrap>
          <div
            style={{
              padding: "16px",
              marginBottom: "24px",
              border: "1px solid #D7D8DB",
              borderLeft: "4px solid #2A86F7 ",
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <AiOutlineBarChart size="60px"></AiOutlineBarChart>
            <div>
              Learn how people are engaging with your photos.
              <span
                style={{
                  color: "#2A86F7",
                  fontWeight: "700",
                  marginLeft: "8px",
                }}
              >
                View Statistics
              </span>
            </div>
          </div>
          <TextWrap>
            <span style={{ fontWeight: "700", marginRight: "24px" }}>
              Category:
            </span>
            <span>
              <TextClick>
                {info?.category}
                <BsChevronRight />
              </TextClick>
            </span>
          </TextWrap>
          <div style={{ marginTop: "8px", display: "flex", flexWrap: "wrap" }}>
            <CategoryBox>Horizontal</CategoryBox>
            <CategoryBox>No People</CategoryBox>
            <CategoryBox>Snow</CategoryBox>
            <CategoryBox>Photography</CategoryBox>
            <CategoryBox>Outdoors</CategoryBox>
            <CategoryBox>Night</CategoryBox>
            <CategoryBox>Winter</CategoryBox>
            <CategoryBox>Sky</CategoryBox>
          </div>
        </ContentContainer>
        {/* 댓글영역 */}
        <CommentContainer>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              marginBottom: "16px",
            }}
          >
            {isLogin && (
              <div style={{ margin: "8px 0 0" }}>
                <FaUserCircle size="36" color="lightgray"></FaUserCircle>
              </div>
            )}
            {isLogin && (
              <StWrapper>
                <TextArea
                  onFocus={() => {
                    setPostWindow(true);
                  }}
                  value={comment}
                  onChange={commentChangeHandler}
                  height={height}
                  onKeyUp={onTextAreaHeightHandler}
                  placeholder="Add a comment"
                ></TextArea>
                {postWindow === true && (
                  <div
                    style={{
                      height: "34px",
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                      paddingTop: "8px",
                    }}
                  >
                    <button
                      onClick={() => {
                        setPostWindow(false);
                      }}
                      style={{
                        width: "92px",

                        backgroundColor: "inherit",
                        border: "none",
                        color: "rgb(8, 112, 209)",
                        fontWeight: "600",
                        fontSize: "16px",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                    <StPostButton post={comment}>Post</StPostButton>
                  </div>
                )}
              </StWrapper>
            )}
          </div>
          <TextWrap>
            <span style={{ fontWeight: "700", marginRight: "24px" }}>
              8 Comments
            </span>
          </TextWrap>
          <CommentBlock>
            <StReplyContainer>
              <StSmallProfilePhoto src="https://drscdn.500px.org/user_avatar/904746/q%3D85_w%3D50_h%3D50/v2?webp=true&v=1&sig=7190608940e8ac858e19b14b57bc5f6e2b7a8a3b4196f76a6814d1c4dacaec0c"></StSmallProfilePhoto>
              <StReplyWrap>
                <div
                  style={{
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontWeight: "700", marginRight: "24px" }}>
                    <TextClick> Snezana Petrovic</TextClick>
                  </span>
                  <span style={{ fontSize: ".7rem" }}>1w</span>
                </div>
                <div
                  style={{
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  Fantastic
                  <span>
                    <BsThreeDots
                      size="12"
                      style={{ marginRight: "8px" }}
                    ></BsThreeDots>
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "4px",
                    height: "21px",

                    paddingLeft: "4px",

                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    onClick={() => {
                      setReplyWindow(!replyWindow);
                    }}
                    style={{
                      color: "#2A86F7",
                      fontSize: ".9rem",
                      cursor: "pointer",
                    }}
                  >
                    Reply
                  </span>
                </div>
              </StReplyWrap>
            </StReplyContainer>
            {replyWindow ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: "16px",
                }}
              >
                <div style={{ margin: "8px 0 0" }}>
                  <FaUserCircle size="36" color="lightgray"></FaUserCircle>
                </div>
                <StWrapper>
                  <TextArea
                    onFocus={() => {
                      setPostWindow(true);
                    }}
                    value={reComment}
                    onChange={reCommentChangeHandler}
                    height={height}
                    onKeyUp={onTextAreaHeightHandler}
                    placeholder="Add a comment"
                  ></TextArea>

                  <div
                    style={{
                      height: "34px",
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                      paddingTop: "8px",
                    }}
                  >
                    <button
                      onClick={() => {
                        setReplyWindow(false);
                      }}
                      style={{
                        width: "92px",

                        backgroundColor: "inherit",
                        border: "none",
                        color: "rgb(8, 112, 209)",
                        fontWeight: "600",
                        fontSize: "16px",
                        cursor: "pointer",
                      }}
                    >
                      Cancle
                    </button>
                    <StPostButton post={reComment}>Post</StPostButton>
                  </div>
                </StWrapper>
              </div>
            ) : (
              ""
            )}
          </CommentBlock>
        </CommentContainer>
      </Container>
    </Body>
  );
};

export default Photo;
const StPostButton = styled.button`
  width: 130px;
  border-radius: 28px;
  border: none;
  background-color: ${(props) => (props.post === "" ? "#B6B9BB" : "#0870D1")};
  color: white;
  font-weight: 600px;
  cursor: pointer;
`;
const CommentBlock = styled.div``;
const StReplyWrap = styled.div`
  width: 100%;
`;

const StSmallProfilePhoto = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;

  margin-right: 8px;
`;
const StReplyContainer = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

const StWrapper = styled.div`
  width: 86%;
  margin-left: 8px;
`;

const TextArea = styled.textarea`
  height: ${(props) => (props.height === 0 ? "51px" : `${props.height}px`)};
  padding: 16px 10px 16px 40px;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
  border-color: #d7d8db;
  font-family: inherit;
  width: 100%;

  resize: none;
  font-size: 16px;

  &:focus {
    border-color: #2a86f7;
  }
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const CategoryBox = styled.div`
  height: 38px;

  border: 1px solid #6d7377;

  padding: 0 8px;
  margin: 0 4px 8px 0;

  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    border-color: #2a86f7;
    color: #2a86f7;
  }
`;
const TextClick = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    color: #2a86f7;
  }
`;

const TextWrap = styled.div`
  width: 100%;
  height: 29px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
`;
const FollowButton = styled.span`
  color: ${(props) => (props.textcolor ? "#757575" : "#2a86f7")};
  cursor: pointer;
  &:hover {
    color: #2a86f7;
    opacity: ${(props) => props.textcolor || 0.8};
  }
`;
const BigString = styled.h3`
  margin: 0 0 8px;
  font-size: 24px;
`;
const ProFileImg = styled.img`
  height: 64px;
  width: 64px;
  background-color: green;
  border-radius: 50%;
`;
const ProFileBox = styled.div`
  height: 88px;
  width: 100%;
  margin-top: 24px;
  padding-bottom: 24px;

  display: flex;
  align-items: center;
`;

const IconWrap = styled.div`
  margin-right: ${(props) => props.direction !== "right" && "24px"};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  background-color: inherit;
  justify-content: center;
  align-items: center;
  position: ${(props) => props.direction === "right" && "absolute"};
  right: ${(props) => props.direction === "right" && "0px"};
  cursor: pointer;
  &:hover {
    opacity: 0.4;
  }
`;

const BoxButton = styled.div`
  width: 100%;
  height: 77%;
  display: flex;
  justify-content: ${(props) =>
    props.direction === "right" ? "flex-end" : "flex-start"};
  align-items: center;
  position: ${(props) => props.direction === "right" && "absolute"};
  top: ${(props) => props.direction === "right" && "40px"};
  cursor: pointer;
`;

const ImgWrap = styled.div`
  width: 90vw;
  height: 100%;
  display: flex;
  justify-content: center;
`;
const IconContainer = styled.div`
  height: 24px;
  width: 100%;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;
const Container = styled.div`
  padding: 24px 16px 16px;

  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;
const ContentContainer = styled.div`
  background-color: white;
  /* min-width: 10vw; */
  /* max-width: 50%; */
  width: 50%;
  overflow: auto;
  padding: 24px;
  flex-grow: 1;
`;
const CommentContainer = styled.div`
  background-color: white;

  min-width: 20%;
  height: 100%;
  padding: 24px;
  flex-grow: 1;
`;

const Body = styled.div`
  background-color: #f7f8fa;
  /* width: 100vw; */
  /* height: 100vh; */
  padding: 0px;
`;
const ImgBox = styled.div`
  height: 60vh;
  position: relative;
  /* width: 100%; */
  /* overflow-x: auto; */
  /* height: 100%; */
  background-color: #222222;
  padding: 24px 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
