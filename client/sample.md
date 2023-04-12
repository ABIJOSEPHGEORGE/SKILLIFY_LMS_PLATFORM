<div className="w-full flex flex-col place-items-start place-content-center">
                <select name="content_type" id="content_type" value={section_content.content_type} onChange={(e)=>dispatch(updateSectionContent({content_type:e.target.value}))} className='w-full border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none'>
                      <option value='select'>select</option>
                      <option value="lecture">Lecture</option>
                      <option value="quiz">Quiz</option>
                      <option value="assignment">Assignment</option>
                </select>
              </div>
              {
                section_content.content_type === 'lecture' &&
                  <div className='w-full'>
                    <div className='w-full flex flex-col gap-4'>
                      <Input variant='static' type='text' label="Lecture Title" name='lecture-title' onChange={(e)=>{setSecTitle(e.target.value)}}/>
                      <Textarea variant='static' label='Description' name='lecture-description' onChange={(e)=>{setSecDesc(e.target.value)}}/>
                      <label htmlFor="lecture-video" className='text-sm text-gray-800'>Choose Lecture Video</label>
                      <input type='file' className=' file:w-40 file:h-20' label='Content Video' name='lecture-video' id='lecture-video' onChange={(e)=>{setVideo(e.target.files[0])}} accept="video/*"/>
                      {
                        video &&
                        <button className='text-lg font-light bg-primaryBlue cursor-pointer text-white w-1/5' type='button' onClick={()=>{uploadVideo()}}>{!path ? 'Upload Video' : 'Video Uploaded'}</button>
                      }
                      
                    </div>
                  </div>
              }