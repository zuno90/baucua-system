api:
	yarn start:dev api-gateway
cms:
	yarn start:dev cms-server
test:
	yarn test
proto-auth:
	protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./apps/api-gateway/src/proto --ts_proto_opt=nestJs=true ./apps/api-gateway/src/proto/auth.proto
push:
	git add .
	git commit -m "update"
	git push
