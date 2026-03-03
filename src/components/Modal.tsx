'use client';

import { useEffect, useState } from 'react';
import { translations, type Lang } from '@/lib/translations';
import type { ProjectId } from '@/app/page';

type Props = {
  projectId: ProjectId;
  lang: Lang;
  projectData: Record<ProjectId, { video: string | null; images: string[] }>;
  onClose: () => void;
};

export default function Modal({ projectId, lang, projectData, onClose }: Props) {
  const [fullImage, setFullImage] = useState<string | null>(null);
  const t = translations[lang];
  const p = `modal-${projectId}-`;
  const proj = projectData[projectId];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { if (fullImage) setFullImage(null); else onClose(); } };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [fullImage, onClose]);

  return (
    <>
      {/* MODAL */}
      <div className="modal-overlay active" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">{t[p + 'title']}</h2>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>
          <div className="modal-body">
            <p className="modal-desc">{t[p + 'desc']}</p>

            <div>
              <div className="modal-section-label">{t['modal-features-title']}</div>
              <ul className="modal-features">
                {t[p + 'features'].split('|').map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>

            <div>
              <div className="modal-section-label">{t['modal-stack-title']}</div>
              <div className="modal-stack-tags">
                {t[p + 'stack'].split('|').map(s => <span key={s} className="modal-tag">{s}</span>)}
              </div>
            </div>

            <div>
              <div className="modal-section-label">{t['modal-challenges-title']}</div>
              <p className="modal-text">{t[p + 'challenges']}</p>
            </div>

            <div>
              <div className="modal-section-label">{t['modal-solutions-title']}</div>
              <p className="modal-text">{t[p + 'solutions']}</p>
            </div>

            {proj.images.length > 0 && (
              <div>
                <div className="modal-section-label">Capturas</div>
                <div className="modal-images">
                  {proj.images.map(src => (
                    <img key={src} src={src} alt="" onClick={e => { e.stopPropagation(); setFullImage(src); }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {proj.video && (
            <div className="modal-actions">
              <a href={proj.video} target="_blank" rel="noreferrer" className="btn-primary">
                {t['modal-video']} ↗
              </a>
            </div>
          )}
        </div>
      </div>

      {/* FULL IMAGE VIEWER */}
      {fullImage && (
        <div className="full-image-overlay" onClick={() => setFullImage(null)}>
          <button className="full-image-close" onClick={() => setFullImage(null)}>×</button>
          <img src={fullImage} alt="" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}