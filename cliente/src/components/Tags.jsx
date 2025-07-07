import React from "react";

const Tags = ({ tags = [] }) => {
  return (
    <section className="group-tags">
      {
        tags.map((tag, i) => (
          <span key={i} className="group-tags__item">
            {tag}
            <i className="fa fa-times" />
          </span>
        ))
      }
    </section>
  )
}

export default Tags;