"use client"
import React, { useRef } from 'react';
import { UseIsVisibleArgs, useIsVisible } from '../../../hooks/useIsVisible';

const TestPage: React.FC<UseIsVisibleArgs> = ({ root, rootMargin, threshold, once}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { setRef, inView} = useIsVisible({ root, rootMargin, threshold, once});

  return (
    <div>
      <div ref={(node) => { setRef(node); }}>
        {inView ? 'In view' : 'Not in view'}
      </div>
      <div ref={targetRef}>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, optio quam animi eum adipisci dolorem, officia libero, quas temporibus rerum maiores dolor autem porro perferendis? Natus sunt fuga sint adipisci.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima earum hic dolorum deleniti, in magni aspernatur sint vitae molestias! Quas iusto aspernatur deleniti dolorem et reiciendis libero minus ut fuga!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, optio quam animi eum adipisci dolorem, officia libero, quas temporibus rerum maiores dolor autem porro perferendis? Natus sunt fuga sint adipisci.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima earum hic dolorum deleniti, in magni aspernatur sint vitae molestias! Quas iusto aspernatur deleniti dolorem et reiciendis libero minus ut fuga!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, optio quam animi eum adipisci dolorem, officia libero, quas temporibus rerum maiores dolor autem porro perferendis? Natus sunt fuga sint adipisci.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima earum hic dolorum deleniti, in magni aspernatur sint vitae molestias! Quas iusto aspernatur deleniti dolorem et reiciendis libero minus ut fuga!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, optio quam animi eum adipisci dolorem, officia libero, quas temporibus rerum maiores dolor autem porro perferendis? Natus sunt fuga sint adipisci.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima earum hic dolorum deleniti, in magni aspernatur sint vitae molestias! Quas iusto aspernatur deleniti dolorem et reiciendis libero minus ut fuga!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, optio quam animi eum adipisci dolorem, officia libero, quas temporibus rerum maiores dolor autem porro perferendis? Natus sunt fuga sint adipisci.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima earum hic dolorum deleniti, in magni aspernatur sint vitae molestias! Quas iusto aspernatur deleniti dolorem et reiciendis libero minus ut fuga!</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, optio quam animi eum adipisci dolorem, officia libero, quas temporibus rerum maiores dolor autem porro perferendis? Natus sunt fuga sint adipisci.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima earum hic dolorum deleniti, in magni aspernatur sint vitae molestias! Quas iusto aspernatur deleniti dolorem et reiciendis libero minus ut fuga!</p>
      </div>
    </div>
    )
}

export default TestPage