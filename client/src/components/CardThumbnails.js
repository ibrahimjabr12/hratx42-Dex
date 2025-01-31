import React, { useState } from "react";
import EditCardModal from './EditCardModal'
import { OverlayTrigger, Tooltip, Card, Button, Col, Row } from 'react-bootstrap';
import CardHeader from './CardHeader'

export default function CardThumbnails(props) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false)

  let { singleCard } = props
  let card_labels = [];
  let cards_members = [];
  for (let  i = 0; i < singleCard.cards_members.length; i++){
    let add = true;
    for (let j = 0; j < cards_members.length; j++){
      if (cards_members[j].member_id == singleCard.cards_members[i].member_id){
        add = false;
      }
    }
    if (add) {cards_members.push(singleCard.cards_members[i])}
  }
  for (let  i = 0; i < singleCard.card_labels.length; i++){
    let add = true;
    for (let j = 0; j < card_labels.length; j++){
      if (card_labels[j].id == singleCard.card_labels[i].id){
        add = false;
      }
    }
    if (add) {card_labels.push(singleCard.card_labels[i])}
  }
  singleCard.card_labels = card_labels;
  singleCard.cards_members = cards_members;

  return (
    <div style={{ width: '250px', height: '250px'}}>
      
      <EditCardModal users={props.users}
                    labels={props.labels}
                    editCard={props.editCard}
                    key={Math.random()}
                    showMe={show}
                    deckNames={props.deckNames}
                    deckTitle={props.deckTitle}
                    card={singleCard}
                    closeModal={handleClose.bind(this)} 
                    deckIndex = {props.deckIndex}
                    cardIndex = {props.cardIndex}
                    />

      <Card onClick={() => {
        setShow(true)
      }} style={{ width: '250px', height: '250px' }} className='CardThumbnailsSingleCard'>
      <div style ={{padding: '5px'}}>
        <CardHeader 
          labels = {props.singleCard.card_labels}
          weight = {props.singleCard.weight}
          impact = {props.singleCard.impact} />
        <div>
          <div style={{ display: 'flex', height: '150px', alignItems: 'center', fontSize: '20px', paddingTop: '15px', paddingLeft: '5px' }}>{props.singleCard.title}</div>
        </div>
        <div style={{ position: "absolute", bottom: "0", width: "100%"}}>
          <div style={{ float: "left", paddingLeft: "5px" }}>
            <img style = {{ height: "15px", marginBottom: "-12px", paddingRight: "5px" }} className='CardThumbnailsMove' src="/assets/downButton.png" onClick={() => props.moveCard(props.singleCard, props.cardIndex, props.deckIndex, 1)} />
            <img style = {{ height: "15px", marginBottom: "-12px" }} className='CardThumbnailsMove' src="/assets/upButton.png" onClick={() => props.moveCard(props.singleCard, props.cardIndex, props.deckIndex, -1)} />
          </div>
          <div style={{ float: "right", paddingRight: "10px", paddingBottom: "5px" }}>
            {/* more users button leads to edit form to view all users */}
            <OverlayTrigger
              key={'bottom'}
              placement={'bottom'}
              overlay={
                <Tooltip id={`tooltip-bottom`}>
                  Add/View More
                </Tooltip>}>
              <Button
                className='CardThumbnails_userIcon float-right'
                variant='secondary'
                onClick={() => {
                  setShow(true)
                }}
              ><strong>+</strong>
              </Button>
            </OverlayTrigger>
            {props.singleCard.cards_members.map((member, i) =>
                <OverlayTrigger
                  key={Math.random()}
                  placement={'bottom'}
                  overlay={
                    <Tooltip id={`tooltip-bottom`}>
                      {member.member_name}
                    </Tooltip>
                  }
                >
                  {member.member_name === null ? (<></>) : i < 6 ? (<Button key={Math.random()} className='CardThumbnails_userIcon float-right' variant='secondary'>{member.member_name.split(" ").map(char => char[0]).join("").toUpperCase()}</Button>) : <></>}
                </OverlayTrigger>
            )}
          </div>
        </div>
        </div>
      </Card>
    </div>
  )
}
