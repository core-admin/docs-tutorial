'use client';

import { cn } from '@/lib/utils';
import { useRef, useState, useEffect } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { useStorage, useMutation } from '@liveblocks/react/suspense';

const markers = Array.from({ length: 83 }, (_, i) => i);

export const Ruler = () => {
  const defaultLeftMargin = 56;
  const defaultRightMargin = 56;
  const marginGap = 100;

  // const [leftMargin, setLeftMargin] = useState(defaultLeftMargin);
  // const [rightMargin, setRightMargin] = useState(defaultRightMargin);

  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const rulerRef = useRef<HTMLDivElement>(null);

  const leftMargin = useStorage(root => root.leftMargin || defaultLeftMargin);
  const setLeftMargin = useMutation(({ storage }, position: number) => {
    storage.set('leftMargin', position);
  }, []);

  const rightMargin = useStorage(root => root.rightMargin || defaultRightMargin);
  const setRightMargin = useMutation(({ storage }, position: number) => {
    storage.set('rightMargin', position);
  }, []);

  const handleLeftMarkerMouseDown = () => {
    setIsDraggingLeft(true);
    setContainerRect();
  };

  const handleRightMarkerMouseDown = () => {
    setIsDraggingRight(true);
    setContainerRect();
  };

  const handleLeftMarkerDoubleClick = () => {
    if (leftMargin !== defaultLeftMargin) {
      setLeftMargin(defaultLeftMargin);
    }
  };

  const handleRightMarkerDoubleClick = () => {
    if (rightMargin !== defaultRightMargin) {
      setRightMargin(defaultRightMargin);
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  const containerRect = useRef<DOMRect | null>(null);
  const setContainerRect = () => {
    const container = rulerRef.current?.querySelector('#ruler-container');
    if (!container) {
      return null;
    }
    containerRect.current = container.getBoundingClientRect();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!(isDraggingLeft || isDraggingRight) || !rulerRef.current) {
      return;
    }

    if (!containerRect.current) {
      return;
    }

    const { width: containerWidth, left: containerLeft } = containerRect.current;
    const relativeX = e.clientX - containerLeft;
    /**
     * 计算并限制标尺标记的位置值
     * @param {number} containerWidth - 容器的宽度
     * @param {number} relativeX - 鼠标相对于容器左边界的X坐标
     * @returns {number} 返回一个在0到容器宽度之间的位置值
     */
    const rawPosition = Math.max(0, Math.min(containerWidth, relativeX));

    if (isDraggingLeft) {
      const maxLeftPosition = containerWidth - rightMargin - marginGap;
      const newLeftPosition = Math.max(defaultLeftMargin, Math.min(rawPosition, maxLeftPosition));
      setLeftMargin(newLeftPosition);
    } else if (isDraggingRight) {
      const maxRightPosition = containerWidth - (leftMargin + marginGap);
      // 直接使用相对位置，从容器右侧开始计算
      const newRightPosition = containerWidth - rawPosition;
      // 确保不会小于0且不会与左边重叠
      const constrainedRightPosition = Math.max(defaultRightMargin, Math.min(newRightPosition, maxRightPosition));
      setRightMargin(constrainedRightPosition);
    }
  };

  useEffect(() => {
    if (isDraggingLeft || isDraggingRight) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDraggingLeft, isDraggingRight]);

  return (
    <div
      className="h-6 border-b w-[816px] mx-auto border-gray-300 flex items-end relative select-none print:hidden"
      ref={rulerRef}
      // onMouseMove={handleMouseMove}
      // onMouseUp={handleMouseUp}
      // onMouseLeave={handleMouseUp}
    >
      <div id="ruler-container" className="w-full h-full relative">
        <Marker
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={handleLeftMarkerMouseDown}
          onDoubleClick={handleLeftMarkerDoubleClick}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleRightMarkerMouseDown}
          onDoubleClick={handleRightMarkerDoubleClick}
        />
        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full w-[816px]">
            {markers.map(marker => {
              const position = (marker * 816) / 82;
              return (
                <div key={marker} className="absolute bottom-0" style={{ left: `${position}px` }}>
                  {marker % 10 === 0 && (
                    <>
                      <div className="absolute bottom-0 w-px h-2 bg-neutral-700"></div>
                      <span className="absolute bottom-2 text-[10px] text-neutral-700 transform -translate-x-1/2 ml-px">
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}

                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <>
                      <div className="absolute bottom-0 w-px h-1.5 bg-neutral-500"></div>
                      {/* <span className="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2 ml-px">
                        {marker / 10 + 1}
                      </span> */}
                    </>
                  )}

                  {marker % 5 !== 0 && (
                    <>
                      <div className="absolute bottom-0 w-px h-1 bg-neutral-300"></div>
                      {/* <span className="absolute bottom-2 text-[10px] text-neutral-300 transform -translate-x-1/2 ml-px">
                        {(marker % 5) / 10 + 1}
                      </span> */}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onDoubleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Marker = ({ position, isLeft, isDragging, onMouseDown, onDoubleClick }: MarkerProps) => {
  return (
    <div
      className={cn('absolute top-0 w-4 h-full cursor-ew-resize z-[5]', isLeft ? '-ml-2' : '-mr-2')}
      style={{ [isLeft ? 'left' : 'right']: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className="absolute left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2" />
      <div
        className="absolute left-1/2 top-4 w-px h-[calc(100vh_-_120px)]"
        style={{
          transform: 'translateX(-50%) scaleX(0.5)',
          backgroundColor: '#3b72f6',
          display: isDragging ? 'block' : 'none',
        }}
      ></div>
    </div>
  );
};
