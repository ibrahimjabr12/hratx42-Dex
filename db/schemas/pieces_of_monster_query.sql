select card_id, array_agg(label_id) from cards_labels group by card_id;