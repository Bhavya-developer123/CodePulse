from pydantic import BaseModel, Field
class TopicStat(BaseModel):
    topic: str = Field(min_length=1)
    solved: int = Field(ge=0)

class WeakTopicRequest(BaseModel):
    topics: list[TopicStat]

class WeakTopicResult(BaseModel):
    topic: str
    solved: int
    status: str

class WeakTopicResponse(BaseModel):
    weak_topics: list[WeakTopicResult]
    message: str