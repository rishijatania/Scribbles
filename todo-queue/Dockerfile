FROM python:3.9.0
COPY ./middleware /app 
WORKDIR /app 
RUN pip install -r requirements.txt
EXPOSE 5000
RUN chmod +x run.sh
CMD ["./run.sh"]